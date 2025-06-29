package com.siva.keyvista.query.controller;

import com.siva.keyvista.query.dto.QueryRequest;
import com.siva.keyvista.query.model.Query;
import com.siva.keyvista.query.service.QueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/query")
@RequiredArgsConstructor
public class QueryController {

    private final QueryService queryService;

    @PostMapping
    public String handleQuery(@RequestBody QueryRequest queryRequest) {

        queryService.addQuery(queryRequest);
        // Logic to handle the query
        return "Query handled successfully";
    }

    @GetMapping
    public List<Query> getAllQueries() {
        // Logic to fetch all queries

        return queryService.getAllQueries();
    }

}
