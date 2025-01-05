package ovh.angrysoft.angrycloud.files;

import java.io.File;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("file")
class FileItem {
    @Id
    UUID id;
    String name;
    long size;
    UUID parent;
    String type;
    String owner;
    LocalDateTime created;
    LocalDateTime updated;


    public FileItem() {}


    public UUID getId() {
        return id;
    }


    public void setId(UUID id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public long getSize() {
        return size;
    }


    public void setSize(long size) {
        this.size = size;
    }


    public UUID getParent() {
        return parent;
    }


    public void setParent(UUID parent) {
        this.parent = parent;
    }


    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public String getOwner() {
        return owner;
    }


    public void setOwner(String owner) {
        this.owner = owner;
    }


    public LocalDateTime getCreated() {
        return created;
    }


    public void setCreated(LocalDateTime created) {
        this.created = created;
    }


    public LocalDateTime getUpdated() {
        return updated;
    }


    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof FileItem))
            return false;
        final FileItem fileItem = (FileItem) obj;
        return name.equals(fileItem.getName()) && parent.equals(fileItem.getParent())
                && type.equals(fileItem.getType()) && owner.equals(fileItem.getOwner());
    }

    @Override
    public int hashCode() {
        return name.hashCode() + parent.hashCode() + type.hashCode() + owner.hashCode();
    }

}
