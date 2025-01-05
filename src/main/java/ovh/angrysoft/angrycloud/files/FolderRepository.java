package ovh.angrysoft.angrycloud.files;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
interface FolderRepository extends CrudRepository<Folder, UUID> {


    Optional<Folder> findByTypeAndOwnerAndParentNull(String type, String owner);

    Optional<Folder> findByIdAndTypeAndOwner(UUID folderId, String type, String owner);

    boolean existsByNameAndParentAndOwner(String name, UUID parent, String username);

}
