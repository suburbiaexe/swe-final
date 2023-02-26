package lfposts;

import java.util.Date;

/**
 * An interface for both lost and found item posts.
 * It includes methods that should apply to both.
 * @author Alex Duchnowski
 */
public interface LFPost {
  // the time when the post was made
  Date getTimestamp();

  // the more specific type of the item
  ItemType getItemType();

  // a human-readable string describing the item in more detail
  String getDetailedDescription();
}
