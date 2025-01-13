package ovh.angrysoft.angrycloud.files;

import java.util.UUID;

record PathItem(String name, String id) {
    public PathItem(String name, UUID id) {
        this(name, id.toString());
    }
}
