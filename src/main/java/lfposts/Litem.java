package lfposts;

import java.util.Date;

/**
 * A class representing a lost item (litem) post
 * and associated data.
 * @author Alex Duchnowski
 */
public class Litem implements LFPost {
  private final Date timestamp;
  private final ItemType itemType;
  private final String detailedDescription;

  public Litem(Date timestamp, ItemType itemType, String detailedDescription) {
    this.timestamp = timestamp;
    this.itemType = itemType;
    this.detailedDescription = detailedDescription;
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
}
