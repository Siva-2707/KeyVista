package com.siva.keyvista.query.service;

import com.siva.keyvista.query.dto.QueryRequest;
import com.siva.keyvista.query.model.Query;
import com.siva.keyvista.query.repository.QueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QueryService {


    private final QueryRepository queryRepository;

    public void addQuery(QueryRequest queryRequest) {
        queryRepository.save(convertToQuery(queryRequest));
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    private Query convertToQuery(QueryRequest queryRequest) {
        Query query = new Query();
        query.setName(queryRequest.name());
        query.setEmail(queryRequest.email());
        query.setMessage(queryRequest.message());
        query.setDate(new java.util.Date()); // Set current date
        return query;
    }
}
