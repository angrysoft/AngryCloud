package ovh.angrysoft.angrycloud.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.stereotype.Service;
import ovh.angrysoft.angrycloud.properties.StorageProperties;

@Service
class Storage {
    private final Path storagePath;

    public Storage(StorageProperties properties) {
        this.storagePath = properties.getLocationPath();
        if (!this.storagePath.toFile().exists()) {
            try {
                Files.createDirectories(storagePath);
            } catch (IOException e) {
                throw new StorageException("Cannot create root directory");
            }
        }
    }

    public Path createFolder(Path folderPath, String name) {

        try {
            return Files.createDirectories(storagePath.resolve(folderPath).resolve(name));
        } catch (IOException e) {
            throw new StorageException("Cannot create root directory " + folderPath.toString());
        }
    }



}
