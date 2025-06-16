package com.siva.keyvista.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SuccessResponseEntity<T> implements ResponseEntity {
    T data;
}
