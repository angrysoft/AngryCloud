package ovh.angrysoft.angrycloud.files;

import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/folder")
class FilesController {
    FileService fileService;



    public FilesController(FileService fileService) {
        this.fileService = fileService;
    }


    @GetMapping
    public Folder getRoot() {
        return fileService.getRoot();
    }

    @GetMapping("/{folderId}")
    public Folder getFolder(@PathVariable UUID folderId) {
        return fileService.getFolder(folderId);
    }

}
