package com.siva.keyvista.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public record KeyVistaRequest<T>(T body) {}
