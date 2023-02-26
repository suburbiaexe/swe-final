package lfposts;

import org.junit.Test;

import static org.junit.Assert.assertTrue;

public class SimilarityTest {
  /**
   * A test which checks that text similarity works as expected.
   */
  @Test
  public void textSimilarityTest() {
    String[] tests = {"airpod case with flower sticker",
                      "airpod case with black rubber casing",
                      "student ID for John Smith",
                      "student ID for Jane Smith",
                      "black earbuds",
                      "white earbuds",
                      "white airpod case"};
    LFSimilarityScorer scorer = new LFSimilarityScorer();
    assertTrue(scorer.textSimilarity(tests[0], tests[1])
                > scorer.textSimilarity(tests[0], tests[2]));
    assertTrue(scorer.textSimilarity(tests[2], tests[3])
                > scorer.textSimilarity(tests[2], tests[4]));
    assertTrue(scorer.textSimilarity(tests[4], tests[5])
                > scorer.textSimilarity(tests[5], tests[6]));
    assertTrue(scorer.textSimilarity(tests[6], tests[0])
            > scorer.textSimilarity(tests[6], tests[5]));
  }
}
