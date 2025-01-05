package ovh.angrysoft.angrycloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.modulith.Modulith;
import ovh.angrysoft.angrycloud.properties.StorageProperties;

@Modulith
@EnableConfigurationProperties(StorageProperties.class)
public class AngrycloudApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngrycloudApplication.class, args);
	}

}
