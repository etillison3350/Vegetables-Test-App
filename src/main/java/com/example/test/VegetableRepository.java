package com.example.test;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VegetableRepository extends JpaRepository<Vegetable, Integer> {

	@Query(value = "SELECT vegetable.* FROM vegetable LEFT JOIN (select vegetableid, SUM(amount) AS total, COUNT(DISTINCT userid) AS users FROM owned_vegetables GROUP BY vegetableid) AS counts ON vegetable.id = counts.vegetableid ORDER BY total DESC, users DESC, vegetable.id ASC LIMIT ?1",
			nativeQuery = true)
	public List<Vegetable> findTop(Integer count);

}
