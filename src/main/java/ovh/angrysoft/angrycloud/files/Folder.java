package ovh.angrysoft.angrycloud.files;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

@Table("file")
class Folder extends FileItem {
    @MappedCollection(idColumn = "parent")
    Set<FileItem> children = new HashSet<>();

    public Folder() {
        this.setType(FileType.FOLDER.name());
        this.setCreated(LocalDateTime.now());
        this.setUpdated(this.getCreated());
    }

    public Set<FileItem> getChildren() {
        return children;
    }

    public void setChildren(Set<FileItem> children) {
        this.children = children;
    }

}
