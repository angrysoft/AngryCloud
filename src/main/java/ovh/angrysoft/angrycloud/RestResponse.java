package ovh.angrysoft.angrycloud;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class RestResponse<T> extends ResponseEntity<ResultResponse<T>> {

    public RestResponse(boolean ok, String error, T data, HttpStatusCode status) {
        super(new ResultResponse<>(ok, error, data), status);
    }

    public RestResponse(T data) {
        super(new ResultResponse<>(true, null, data), HttpStatus.OK);
    }

    public static RestResponse<String> notFound(String data) {
        return new RestResponse<>(false, "Item not found", data, HttpStatus.NOT_FOUND);
    }

    public static RestResponse<String> statusOk() {
        return new RestResponse<>(true, null, "ok", HttpStatus.OK);
    }
}


@JsonInclude(Include.NON_NULL)
record ResultResponse<T>(boolean ok, String error, T data) {

}

