package com.siva.keyvista.util;

import org.springframework.http.HttpStatus;

public record KeyVistaResponse<T>(HttpStatus status, String description, T body) {
}
