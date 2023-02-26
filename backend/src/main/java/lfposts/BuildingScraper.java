package lfposts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * This is a class to store the scrapeBuildings method.
 * @author Alex Duchnowski
 */
public class BuildingScraper {
  /**
   * This method returns a list of locations on Brown's campus
   * scraped from the Brown Maps V7 site.
   */
  @Test
  public void scrapeBuildings() {
    // There will be various messages in the console...
    //   (By default, Selenium prints a lot of info)
    WebDriverManager.chromedriver().setup();

    ChromeOptions options = new ChromeOptions();
    ChromeDriver driver = new ChromeDriver(options);
    driver.manage().timeouts().implicitlyWait(Duration.ofMillis(1000));

    String path = "https://www.brown.edu/Facilities/Facilities_Management/maps/#category/ADMIN";
    driver.get(path);

    System.out.println("Locating tags...");
    WebElement table = driver.findElement(By.id("BrownMenu"));
    WebElement liAll = table.findElement(By.id("cat_ALL"));
    WebElement ulAll = liAll.findElement(By.tagName("ul"));
    List<WebElement> buildings = ulAll.findElements(By.id("building"));
    List<String> buildingStrings = new ArrayList<>();

    System.out.println("Looping through " + buildings.size() + " elements...");
    for (WebElement building : buildings) {
      buildingStrings.add(building.findElement(By.tagName("a"))
              .getAttribute("innerText"));
    }
    System.out.println("Building Names:");
    for (String building : buildingStrings) {
      System.out.println(building
              .replaceAll("\\s|:|,|\\.|\\(|\\)|-|'", "")
              .replaceAll("&", "AND")
              .replaceAll("5th", "fifth")
              .toUpperCase()
              + ",    //" + building);
    }

    driver.quit();

    //return buildingStrings;
  }
}
