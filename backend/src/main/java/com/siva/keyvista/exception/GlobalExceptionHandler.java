package com.siva.keyvista.exception;

import com.siva.keyvista.exception.custom.AlreadyExistException;
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
    public KeyVistaResponse<FailureResponseEntity> handleGenericException(Exception ex) {
        return new KeyVistaResponse<>(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "EXECUTION_FAILED",
                new FailureResponseEntity(ex)
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public KeyVistaResponse<FailureResponseEntity> handleIllegalArgument(IllegalArgumentException ex) {
        return new KeyVistaResponse<>(
                HttpStatus.BAD_REQUEST,
                "INVALID_ARGUMENT",
                new FailureResponseEntity(ex)
        );
    }


    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public KeyVistaResponse<FailureResponseEntity> handleNoSuchElementException(NoSuchElementException ex) {
        return new KeyVistaResponse<>(
                HttpStatus.NOT_FOUND,
                "NOT_FOUND",
                new FailureResponseEntity(ex)
        );
    }


    @ExceptionHandler(AlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public KeyVistaResponse<FailureResponseEntity> handleUsernameAlreadyExistsException(AlreadyExistException ex){
        return new KeyVistaResponse<>(
                HttpStatus.CONFLICT,
                "Username already exists",
                new FailureResponseEntity(ex)
        );
    }

}
