package ovh.angrysoft.angrycloud.files;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;
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

    public void uploadFile(MultipartFile file, String fileName, Path dirPath) {
        Path pathToStoreFile = storagePath.resolve(dirPath);

        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            Path destFile = pathToStoreFile.resolve(fileName).normalize().toAbsolutePath();

            if (!destFile.getParent().equals(pathToStoreFile.toAbsolutePath())) {
                throw new IllegalArgumentException("store outside current dir is not allowed");
            }
            if (Files.exists(pathToStoreFile.resolve(fileName).toAbsolutePath())) {
                throw new FileAlreadyExistsException("File already exist");
            }

            file.transferTo(pathToStoreFile.resolve(fileName));

        } catch (IllegalStateException | IOException e) {
            throw new StorageException("Can't store file %s".formatted(fileName), e.getCause());
        }
        Assert.isTrue(Files.exists(pathToStoreFile), "File not stored: %s".formatted(fileName));
    }
}
