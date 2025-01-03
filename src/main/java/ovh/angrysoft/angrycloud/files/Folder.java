package ovh.angrysoft.angrycloud.files;

import java.util.HashSet;
import java.util.Set;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

@Table("file")
public class Folder extends FileItem {
    @MappedCollection(idColumn = "parent")
    Set<FileItem> children = new HashSet<>();


    public Set<FileItem> getChildren() {
        return children;
    }

    public void setChildren(Set<FileItem> children) {
        this.children = children;
    }

}
