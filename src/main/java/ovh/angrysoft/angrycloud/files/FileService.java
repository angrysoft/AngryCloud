package ovh.angrysoft.angrycloud.files;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;


@Service
class FileService {
    FolderRepository folderRepository;
    Storage storage;

    public FileService(FolderRepository folderRepository, Storage storage) {
        this.folderRepository = folderRepository;
        this.storage = storage;
    }

    public Folder getFolder(UUID folderId) {
        Assert.notNull(folderId, "Folder id cannot by empty");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = (User) authentication.getPrincipal();
        return folderRepository
                .findByIdAndTypeAndOwner(folderId, FileType.FOLDER.name(), user.getUsername())
                .orElseThrow();

    }

    @Transactional
    public Folder getRoot() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = (User) authentication.getPrincipal();

        var root = folderRepository
                .findByTypeAndOwnerAndParentNull(FileType.FOLDER.name(), user.getUsername())
                .or(() -> {
                    var folder = new Folder();
                    folder.setOwner(user.getUsername());
                    folder.setName(user.getUsername());
                    folder.setSize(0L);
                    folder.setType(FileType.FOLDER.name());
                    folder.setCreated(LocalDateTime.now());
                    folder.setUpdated(folder.getCreated());
                    storage.createFolder(Path.of(""), folder.getName());
                    return Optional.ofNullable(folderRepository.save(folder));
                });
        return root.orElseThrow();
    }

    @Transactional
    public Folder createFolder(String name, UUID parent) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = (User) authentication.getPrincipal();
        if (folderRepository.existsByNameAndParentAndOwner(name, parent, user.getUsername())) {
            throw new StorageException("Folder already exist");
        }

        var folderPath = getFolderPath(parent);

        var newDirName = makeFolderName(name);

        storage.createFolder(folderPath, newDirName);
        var folder = new Folder();
        folder.setOwner(user.getUsername());
        folder.setParent(parent);
        folder.setName(newDirName);
        folder.setType(FileType.FOLDER.name());
        return folderRepository.save(folder);
    }

    Path getFolderPath(UUID folderId) {
        var path = Path.of("");
        for (var p : getFolderList(folderId).reversed()) {
            path = path.resolve(p);
        }
        return path;
    }

    List<String> getFolderList(UUID folderId) {
        var folder = folderRepository.findById(folderId).orElseThrow();
        List<String> result = new ArrayList<>();
        result.add(folder.getName());
        if (folder.getParent() != null) {
            result.addAll(getFolderList(folder.getParent()));
        }

        return result;
    }


    public void sendFiles(UUID folderId, MultipartFile[] files) {
        Assert.notNull(folderId, "folderId cannot by empty");
        Assert.notNull(files, "Brak plików do zapisania");

        var folder = folderRepository.findById(folderId).orElseThrow();
        
        var path = getFolderPath(folder.getId());
        for (MultipartFile fileToSave : files) {
            Assert.isInstanceOf(MultipartFile.class, fileToSave);
            var fileName = makeFolderName(fileToSave.getName());
            if (folder.hasFileWithName(fileName)) {
                //TODO
            }
            storage.uploadFile(fileToSave, fileName, path);
        }

        folderRepository.save(folder);
    }

    String makeFolderName(String originalName) {
        var path = Paths.get(originalName).normalize().toAbsolutePath().toFile();
        return path.getName();
    }
}
