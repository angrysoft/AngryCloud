package ovh.angrysoft.angrycloud;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

@SpringBootTest(classes = AngrycloudApplicationTests.class)
class AngrycloudApplicationTests {
	ApplicationModules modules = ApplicationModules.of(AngrycloudApplication.class);

	@Test
	void contextLoads() {}

	@Test
	void verifyTest() {
		modules.verify();
	}

	@Test
	void writeDocumentationSnippets() {
		new Documenter(modules).writeModulesAsPlantUml().writeIndividualModulesAsPlantUml()
				.writeAggregatingDocument();
	}
}
