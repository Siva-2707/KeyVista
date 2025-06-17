package com.siva.keyvista.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FailureResponseEntity{

    private String message;
    private String exceptionType;

    public FailureResponseEntity(Exception e) {
        this.message = e.getMessage();
        this.exceptionType = e.getClass().getSimpleName();
    }

}
