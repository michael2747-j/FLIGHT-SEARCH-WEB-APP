# server.py — static file server + proxy for /search.json -> SerpAPI
# Works with Python 3.7+ on Windows/macOS/Linux. No extra packages needed.

import http.server
import socketserver
import urllib.request
import urllib.parse
import ssl
import sys

PORT = 8080
UPSTREAM = "https://serpapi.com/search.json"

class Handler(http.server.SimpleHTTPRequestHandler):
    # Add permissive CORS headers to all responses (static + proxy)
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    # Handle CORS preflight just in case (GETs won’t need it, but harmless)
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_GET(self):
        # Proxy /search.json (and its querystring) to SerpAPI
        if self.path.startswith("/search.json"):
            self.proxy_to_serpapi()
            return
        # Otherwise serve local files (index.html, app.jsx, etc.)
        super().do_GET()

    def proxy_to_serpapi(self):
        # Preserve the original query string
        parsed = urllib.parse.urlsplit(self.path)
        qs = parsed.query or ""
        upstream_url = UPSTREAM + ("?" + qs if qs else "")

        # Forward the request
        req = urllib.request.Request(
            upstream_url,
            headers={
                "User-Agent": "Mozilla/5.0 (LocalProxy)",
                "Accept": "application/json, text/plain, */*",
            },
            method="GET",
        )

        ctx = ssl.create_default_context()

        try:
            with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
                data = resp.read()
                status = resp.getcode()
                ctype = resp.headers.get("Content-Type", "application/json; charset=utf-8")

                self.send_response(status)
                self.send_header("Content-Type", ctype)
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            body = e.read() if hasattr(e, "read") else (str(e).encode("utf-8"))
            self.send_response(e.code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
        except Exception as ex:
            msg = ('{"error":"proxy_error","detail":%s}' % (repr(str(ex)))).encode("utf-8")
            self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(msg)

def main():
    global PORT
    # Allow overriding port:  python server.py 8081
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except:
            pass
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving on http://127.0.0.1:{PORT}")
        print("-> Static files from current folder")
        print("-> Proxy:  /search.json?…  --->  https://serpapi.com/search.json?…")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down…")

if __name__ == "__main__":
    main()
