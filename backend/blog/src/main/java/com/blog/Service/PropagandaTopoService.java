package com.blog.Service;

import com.blog.Entity.BlogEntity;
import com.blog.Entity.PropagandaTopoEntity;
import com.blog.Repository.BlogRepository;
import com.blog.Repository.PropagandaTopoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PropagandaTopoService {


    private final PropagandaTopoRepository  propagandaTopoRepository;

    public PropagandaTopoService(PropagandaTopoRepository  propagandaTopoRepository) {
        this.propagandaTopoRepository = propagandaTopoRepository;
    }

    public PropagandaTopoEntity createAdvertising(PropagandaTopoEntity propagandaTopoEntity) {
        return propagandaTopoRepository.save(propagandaTopoEntity);
    }



    public List<PropagandaTopoEntity> getAdvertisingTopoAll() {
        return propagandaTopoRepository.findAll();
    }


    public PropagandaTopoEntity getAdvertisingById(Long id) {
        Optional<PropagandaTopoEntity> advertising = propagandaTopoRepository.findById(id);
        return advertising.orElse(null);  // Retorna null caso o id não seja encontrado
    }




    public boolean deleteAdvertising(Long id) {
        if (propagandaTopoRepository.existsById(id)) {
            propagandaTopoRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
