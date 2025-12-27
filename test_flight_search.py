from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

BASE_URL = "http://127.0.0.1:8080/index.html"


class FlightSearchTests(unittest.TestCase):

    def setUp(self):
        # Launch Chrome (you can switch to Firefox or another browser if needed)
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)
        self.driver.get(BASE_URL)

    def tearDown(self):
        self.driver.quit()

    def load_example_data(self):
        """
        Helper method:
        Clicks the 'Load example data' button and waits until something
        (cards, metadata, or an error) is rendered.
        """
        driver = self.driver

        # Wait until the button is clickable and click it
        example_btn = self.wait.until(
            EC.element_to_be_clickable((By.ID, "load-example"))
        )
        example_btn.click()

        # Wait until either cards, metadata, or error appear
        def something_loaded(drv):
            cards = drv.find_elements(By.CSS_SELECTOR, ".card")
            metadata = drv.find_elements(
                By.XPATH, "//h3[contains(., 'Search metadata')]"
            )
            errors = drv.find_elements(By.CSS_SELECTOR, ".error")
            return cards or metadata or errors

        self.wait.until(something_loaded)

    def test_example_data_metadata_displayed(self):
        """
        Requirement tested:
        Connecting the UI to data (search metadata displayed).
        """
        self.load_example_data()
        driver = self.driver

        # Check that no error banner is displayed
        errors = driver.find_elements(By.CSS_SELECTOR, ".error")
        self.assertEqual(
            len(errors),
            0,
            "An error was displayed after loading example data."
        )

        # Check that the 'Search metadata' section exists
        metadata = driver.find_elements(
            By.XPATH, "//h3[contains(., 'Search metadata')]"
        )
        self.assertGreater(
            len(metadata),
            0,
            "Search metadata section not found after loading example data."
        )

        print("✔ Metadata test passed: Search metadata loaded and displayed correctly.")

    def test_example_data_flight_cards_rendered(self):
        """
        Requirement tested:
        Display of search results (flight cards with prices).
        """
        self.load_example_data()
        driver = self.driver

        # Check that no error banner is displayed
        errors = driver.find_elements(By.CSS_SELECTOR, ".error")
        self.assertEqual(
            len(errors),
            0,
            "An error was displayed instead of flight cards."
        )

        # Check that at least one flight card is rendered
        cards = driver.find_elements(By.CSS_SELECTOR, ".card")
        self.assertGreater(
            len(cards),
            0,
            "No flight result cards were rendered from example data."
        )

        # Check that the first card has a visible price
        first_card = cards[0]
        price_element = first_card.find_element(By.CLASS_NAME, "card-price")
        self.assertTrue(
            price_element.text.strip() != "",
            "The first flight card has no visible price text."
        )

        print("✔ Flight card test passed: Flight results rendered with visible prices.")


if __name__ == "__main__":
    unittest.main()
