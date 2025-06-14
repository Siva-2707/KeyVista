package com.siva.keyvista.util;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SuccessResponseEntity<T> implements ResponseEntity {
    T data;
}
