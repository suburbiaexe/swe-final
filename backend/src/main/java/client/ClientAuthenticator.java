package client;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


/**
 * Class that access the apiKey for client authentication.
 * Currently not used but might be implemented in a future version to increase security of access to the api
 * @author Daniel Graves
 */
public final class ClientAuthenticator {

  /** constructor that ensures the class can never be instantiated.
   */
  private ClientAuthenticator() {
  }

  /**
   * method that accesses the apiKey for client authentication.
   * @return a String representing the ApiKey
   * @throws IOException if the filepath is not accessible
   */
  public static String getApiKey() throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader("config/secret/apikey.txt"));
    return reader.readLine();
  }
}
