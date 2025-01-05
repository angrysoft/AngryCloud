package ovh.angrysoft.angrycloud.exceptions;

import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ovh.angrysoft.angrycloud.RestResponse;
import ovh.angrysoft.angrycloud.files.StorageException;

@ControllerAdvice
class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {NoSuchElementException.class})
    protected RestResponse<String> notFoundHandler(RuntimeException ex, WebRequest request) {
        return RestResponse.notFound(ex.getMessage());
    }

    @ExceptionHandler(value = {StorageException.class})
    protected RestResponse<String> handleStorageException(RuntimeException ex, WebRequest request) {
        return new RestResponse<>(false, "Storage error", ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
