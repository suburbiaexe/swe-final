package api;

import java.net.URI;
import java.net.http.HttpRequest;

// Code borrowed from Aaron Igra from Project 2
/**
 * Utility class for creating HTTP get and post requests.
 * @author Daniel Graves
 */
public final class ClientRequestGenerator {

  private ClientRequestGenerator() {}

  /**
   * Creates a keyed POST request, given a body and a key.
   *
   * @param reqUri The URI the request is being sent to.
   * @param body   The string representing the body of the request.
   * @return An HTTP POSTRequest
   */
  public static HttpRequest runPostCommand(String reqUri, String body) {
    return HttpRequest.newBuilder()
        .uri(URI.create(reqUri))
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();
  }
}