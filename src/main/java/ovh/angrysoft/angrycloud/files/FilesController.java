package ovh.angrysoft.angrycloud.files;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ovh.angrysoft.angrycloud.RestResponse;



@RestController
@RequestMapping("/api/folder")
class FilesController {
    FileService fileService;

    public FilesController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value = {"", "/"})
    public RestResponse<Folder> getRoot() {
        return new RestResponse<>(fileService.getRoot());
    }

    @GetMapping("/{folderId}")
    public RestResponse<Folder> getFolder(@PathVariable UUID folderId) {
        return new RestResponse<>(fileService.getFolder(folderId));
    }

    @PostMapping(value ={"/", "/{folderId}"})
    public RestResponse<Folder> createFolder(@RequestBody FolderName name,
            @PathVariable  Optional<UUID> folderId) {
        var folder = fileService.createFolder(name.name(), folderId);
        return new RestResponse<>(folder);
    }


    @PostMapping("/{folderId}/upload")
    public RestResponse<String> uploadFiles(@PathVariable UUID folderId, MultipartFile[] files) {
        fileService.sendFiles(folderId, files);
        return RestResponse.statusOk();
    }


    // @GetMapping("/admin/events/{eventId}/file/{fileName}")
    // ResponseEntity<Resource> getFileByName(@PathVariable Long eventId, @PathVariable String
    // fileName) {
    // try {
    // var resource = eventFacade.getEventFile(eventId, fileName);
    // InputStreamResource streamResource = new InputStreamResource(resource.getInputStream());
    // MediaType contentType = getContentType(resource);

    // return ResponseEntity.ok()
    // .contentLength(resource.contentLength())
    // .contentType(contentType)
    // .header(HttpHeaders.CONTENT_DISPOSITION,
    // ContentDisposition.attachment().filename(resource.getFilename()).build().toString())
    // .body(streamResource);
    // } catch (IOException e) {
    // return ResponseEntity.notFound().build();
    // }
    // }

    private MediaType getContentType(Resource resource) throws IOException {
        MediaType contentType;
        try {
            contentType = MediaType.valueOf(Files.probeContentType(resource.getFile().toPath()));
        } catch (InvalidMediaTypeException e) {
            contentType = MediaType.APPLICATION_OCTET_STREAM;
        }
        return contentType;
    }
}


record FolderName(String name) {
}
