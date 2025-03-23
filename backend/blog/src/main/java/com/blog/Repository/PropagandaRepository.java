package com.blog.Repository;

import com.blog.Entity.BlogEntity;
import com.blog.Entity.PropagandaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropagandaRepository  extends JpaRepository<PropagandaEntity, Long> {

}
