package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import lfposts.Fitem;
import lfposts.ItemType;
import lfposts.LFSimilarityScorer;
import lfposts.Litem;
import spark.Request;
import spark.Response;
import spark.Route;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Class for the handler to return the appropriate fitems for a given user (assuming they already have a litem)
 * @author Primarily Daniel Graves with some help from Alex and Hannah
 */
public class LitemResults implements Route {

    /**
     * Field to store the database that the handler connects to
     */
    private final LostFoundDatabase database;

    /**
     * Field to store the maximum number of results to return for the given litem
     */
    private final int MAX_RESULTS_TO_RETURN = 12;

    /**
     * Constructor to initialize the handler
     * @param database the database that the handler will connect to
     */
    public LitemResults(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the post request to return fitems for a user
     * @param request the request to the api endpoint, which contains information for the user
     * @param response the response from the api endpoint
     * @return the json formatted string of the response which contains the most relevant fitems to the user
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        String userID = dataMap.get("userID");

        // val contains the litems currently in the database for the current user
        //  (should always be 1 if this handler is used)
        List<List<String>> val = database.getFromTable("litem", "*", "userID",
                userID);
        // Initialize information for finding matches
        Map<String, Integer> topScores = new HashMap();
        int minScore = 0;       // the current minimum score stored in topScores
        String minID = null;    // a String which stores the ID of the fitem in topScores with the lowest score
        List<List<String>> fitems = database.getFromTable("fitem", "*", "itemType",
                val.get(0).get(2));
        LFSimilarityScorer scorer = new LFSimilarityScorer();

        // Create a litem object from the litem we are searching results for
        Date timestamp = new SimpleDateFormat("dd/MM/yyyy").parse(val.get(0).get(5));
        ItemType itemType = ItemType.valueOf(val.get(0).get(2));
        String detailedDescription = val.get(0).get(3);
        Litem litem = new Litem(timestamp, itemType, detailedDescription);

        // Finds the item ids of the closest fitems to the inputted litem
        for (List<String> fitem : fitems) {
            Fitem fitemObject = new Fitem(new SimpleDateFormat("dd/MM/yyyy").parse(fitem.get(11)),
                    ItemType.valueOf(fitem.get(6)), fitem.get(9), fitem.get(4));
            Integer score = scorer.similarityScore(litem, fitemObject);
            // Check to see if we have room to add more results
            if (topScores.keySet().size() == MAX_RESULTS_TO_RETURN) {
                // If we are at capacity of number of results, check if the current score is greater than minimum score
                if (score > minScore) {
                    // Replace the minimum scoring item from the list
                    topScores.remove(minID);
                    topScores.put(fitem.get(0), score);
                    minScore = 100;
                    // Search through the current top scores and update the minimum score
                    for (String key : topScores.keySet()) {
                        if (topScores.get(key) < minScore) {
                            minScore = topScores.get(key);
                            minID = key;
                        }
                    }
                }
            } else if (topScores.keySet().size() < MAX_RESULTS_TO_RETURN) {
                // If there is room, automatically add the current fitem as a result
                topScores.put(fitem.get(0), score);
                // Update the minimum score
                if (score < minScore || minID == null) {
                    minScore = score;
                    minID = fitem.get(0);
                }
            }
        }
        // Sort the top scores
        List<String> ids = new ArrayList<>(topScores.keySet());
        ids.sort(Comparator.comparingInt(topScores::get));

        List<Map<String, String>> retVal = new ArrayList<>();
        // Get column headers
        List<String> colNames = database.printColumns("fitem");
        // Populate hashmap of column headers to values for each matching fitem
        for (List<String> fitem : fitems) {
            if (ids.contains(fitem.get(0))) {
                Map<String, String> itemMap = new HashMap<>();
                for (int i = 0; i < fitem.size(); i++) {
                    itemMap.put(colNames.get(i), fitem.get(i));
                }
                retVal.add(itemMap);
            }
        }

        String toReturn = gson.toJson(retVal);
        return toReturn;
    }
}
