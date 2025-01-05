package ovh.angrysoft.angrycloud.properties;

import java.nio.file.Path;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {
    private String location = "media";

    public String getLocation() {
        return location;
    }

    public void setLocation(String path) {
        this.location = path;
    }

    public Path getLocationPath() {
        return Path.of(this.location);
    }
}
