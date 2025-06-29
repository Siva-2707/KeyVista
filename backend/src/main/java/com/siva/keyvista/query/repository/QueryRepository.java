package com.siva.keyvista.query.repository;

import com.siva.keyvista.query.model.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query, Integer> {
}
