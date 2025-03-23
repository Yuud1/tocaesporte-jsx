package com.blog.Service;

import com.blog.Entity.BlogEntity;
import com.blog.Entity.PropagandaEntity;
import com.blog.Repository.PropagandaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropagandaService {
    private final PropagandaRepository propagandaRepository;

    public PropagandaService(PropagandaRepository propagandaRepository) {
        this.propagandaRepository = propagandaRepository;
    }

    public PropagandaEntity createAdvertising(PropagandaEntity propagandaEntity) {
        return propagandaRepository.save(propagandaEntity);
    }

    public List<PropagandaEntity> getAdvertisingAll() {
        return propagandaRepository.findAll();
    }
    public PropagandaEntity getAdvertisingById(Long id) {

        return propagandaRepository.findById(id).orElse(null);
    }
    public boolean deleteAdvertising(Long id) {
        if (propagandaRepository.existsById(id)) {
            propagandaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
