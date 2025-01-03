package ovh.angrysoft.angrycloud.files;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


@Service
class FileService {
    FolderRepository folderRepository;


    public FileService(FolderRepository fileRepository) {
        this.folderRepository = fileRepository;
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
        System.out.println(user);

        var root = folderRepository
                .findByTypeAndOwnerAndParentNull(FileType.FOLDER.name(), user.getUsername())
                .or(() -> {
                    var folder = new Folder();
                    folder.setOwner(user.getUsername());
                    folder.setName("root");
                    folder.setSize(0L);
                    folder.setType(FileType.FOLDER.name());
                    folder.setCreated(LocalDateTime.now());
                    folder.setUpdated(folder.getCreated());
                    return Optional.ofNullable(folderRepository.save(folder));
                });
        return root.orElseThrow();
    }
}
