package lfposts;

import java.util.Date;

/**
 * A class representing a found item (fitem) post
 * and associated data.
 * @author Alex Duchnowski
 */
public class Fitem implements LFPost {
  private final Date timestamp;
  private final ItemType itemType;
  private final String detailedDescription;
  private final String currentLocation;

  public Fitem(Date timestamp, ItemType itemType, String detailedDescription,
               String currentLocation) {
    this.timestamp = timestamp;
    this.itemType = itemType;
    this.detailedDescription = detailedDescription;
    this.currentLocation = currentLocation;
  }

  public Date getTimestamp() {
    return timestamp;
  }

  public ItemType getItemType() {
    return itemType;
  }

  public String getDetailedDescription() {
    return detailedDescription;
  }

  public String getCurrentLocation() {
    return currentLocation;
  }
}
