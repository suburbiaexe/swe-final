package lfposts;

import java.io.IOException;
import java.nio.file.Files;

import java.nio.file.Paths;
import java.util.Arrays;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import static org.junit.Assert.assertEquals;

/**
 * A class which facilitates scoring the similarity of a lost post and a found post.
 * @author Alex Duchnowski
 */
public class LFSimilarityScorer {
  // a hashmap which gives weights to specific aspects of the items matching

  private final HashMap<String, Integer> weights = new HashMap<>() {
    {
      put("ItemType", 60);
      put("Description", 40);
    }
  };

  /**
   * A constructor which simply checks that the weights map has weights
   * which sum to 100.
   */
  public LFSimilarityScorer() {
    int total = 0;
    for (String key : weights.keySet()) {
      total += weights.get(key);
    }
    assertEquals(100, total);
  }

  /**
   * UNDER CONSTRUCTION
   * A method which takes a Litem and a Fitem and returns a numerical score
   * corresponding to how similar the two items are.
   *
   * @param litem the lost item to be compared
   * @param fitem the found item to be compared
   * @return an integer ranging from 0 to 100 representing the similarity of the items
   */
  public int similarityScore(Litem litem, Fitem fitem) {
    int score = 0;

    if (litem.getItemType().equals(fitem.getItemType())) {
      score += weights.get("ItemType");
    }

    double descriptionSimilarity = textSimilarity(litem.getDetailedDescription(),
            fitem.getDetailedDescription());
    int descriptionScore = (int) Math.round(weights.get("Description") * descriptionSimilarity);
    score += descriptionScore;

    return score;
  }

  /**
   * A method which takes two strings, a and b, both expected to be English text,
   * and returns a score from 0 to 1 representing how similar they are.
   *
   * @param a the first string to be compared
   * @param b the second string to be compared
   * @return the similarity score of the two strings
   */
  public double textSimilarity(String a, String b) {
    Set<String> aWordsSet = new HashSet<>(Arrays.asList(a.split(" ")));
    Set<String> bWordsSet = new HashSet<>(Arrays.asList(b.split(" ")));

    try {
      String filename="src/main/resources/stop_words.txt";
      List<String> stopWords = Files.readAllLines(Paths.get(filename));
      stopWords.forEach(aWordsSet::remove);
      stopWords.forEach(bWordsSet::remove);
    } catch (IOException e) {
      System.out.println("Error while reading from stopwords file: " + e);
    }

    Set<String> intersection = new HashSet<>(aWordsSet);
    intersection.retainAll(bWordsSet);

    return (double) 2 * intersection.size() / (aWordsSet.size() + bWordsSet.size());
  }
}
