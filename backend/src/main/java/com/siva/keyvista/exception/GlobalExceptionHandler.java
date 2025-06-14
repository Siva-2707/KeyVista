package com.siva.keyvista.exception;

import com.siva.keyvista.util.FailureResponseEntity;
import com.siva.keyvista.util.KeyVistaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public KeyVistaResponse<?> handleGenericException(Exception ex) {
        return new KeyVistaResponse<>(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "EXECUTION_FAILED",
                new FailureResponseEntity(ex)
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public KeyVistaResponse<?> handleIllegalArgument(IllegalArgumentException ex) {
        return new KeyVistaResponse<>(
                HttpStatus.BAD_REQUEST,
                "INVALID_ARGUMENT",
                new FailureResponseEntity(ex)
        );
    }
}
