package ovh.angrysoft.angrycloud.files;

import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
interface FileRepository extends CrudRepository<FileItem, UUID> {

}
