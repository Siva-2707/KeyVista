package com.siva.keyvista.exception;

import com.siva.keyvista.util.FailureResponseEntity;
import com.siva.keyvista.util.KeyVistaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KeyVistaResponse<?> handleGenericException(Exception ex) {
        return new KeyVistaResponse<>(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "EXECUTION_FAILED",
                new FailureResponseEntity(ex)
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public KeyVistaResponse<?> handleIllegalArgument(IllegalArgumentException ex) {
        return new KeyVistaResponse<>(
                HttpStatus.BAD_REQUEST,
                "INVALID_ARGUMENT",
                new FailureResponseEntity(ex)
        );
    }


    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public KeyVistaResponse<?> handleNoSuchElementException(NoSuchElementException ex) {
        return new KeyVistaResponse<>(
                HttpStatus.NOT_FOUND,
                "NOT_FOUND",
                new FailureResponseEntity(ex)
        );
    }

}
