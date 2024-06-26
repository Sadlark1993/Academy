import * as neo4j from "neo4j-driver";

export default class Neo4j {
  static driver: neo4j.Driver;
  static ready = false;

  static conect = async () => {
    // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
    const URI = import.meta.env.VITE_URI;
    const USER = import.meta.env.VITE_USER;
    const PASSWORD = import.meta.env.VITE_PASSWORD;

    try {
      this.driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
      //const serverInfo = await this.driver.getServerInfo();
      //console.log("Connection established");
      //console.log(serverInfo);
    } catch (err: unknown) {
      /* @ts-expect-error err is type unknown */
      console.log(`Connection error\n${err}\nCause: ${err.cause}`);
    }
  };

  /* 
    This method will create the initial data in the graph
  */
  static init = async () => {
    if (!this.driver) await this.conect();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { records, summary, keys } = await this.driver.executeQuery(
      `
      MERGE (s:Step { 
        id: 'step-1', 
        title: 'O primeiro passo', 
        content: 'O conteúdo do primeiro passo' 
      })
      MERGE (t:Trail {
        id: 'trail-1',
        title: 'A primeira trilha'
      })  
      MERGE (tm:Theme {
        id: 'theme-1',
        title: 'O primeiro tema'
      })
      MERGE (a:Academy {
        id: 'academy-1',
        title: 'A primeira academia'
      })

      MERGE (a)-[:HAS]->(tm)
      MERGE (tm)-[:HAS]->(t)
      MERGE (t)-[:HAS]->(s)
      `,
      {},
      { database: "neo4j" }
    );
    this.ready = true;

    // Summary information
    //console.log(`>> The query ${summary.query.text} ` + `returned ${records.length} records ` + `in ${summary.resultAvailableAfter} ms.`);

    // Loop through results and do something with them
    //console.log(">> Results");
    //records.forEach((record) => console.log(record.get("name")));
  };

  //saves the step if the trail exists and step does't exists
  static saveStep = async (trail: string, step: { id: string; title: string; content: string }) => {
    if (!this.driver || !this.ready) await this.init();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {
      let response = await this.driver.executeQuery(`MATCH (s:Step {id: $id}) return s`, { id: step.id }, { database: "neo4j" });
      if (response.records.length) {
        console.log("achou");
        console.log(response.records);
        return false;
      }

      response = await this.driver.executeQuery(
        `
      MATCH (t:Trail {id: $trail})
      MERGE (s2:Step {id: $id})
      ON CREATE
      SET s2.title = $title, s2.content = $content
      MERGE (t)-[r:HAS]->(s2)
      RETURN t, r, s2
      `,
        { trail: trail, id: step.id, title: step.title, content: step.content },
        { database: "neo4j" }
      );

      console.log(response.records);
      // Summary information
      console.log(`returned ${response.records.length} records ` + `in ${response.summary.resultAvailableAfter} ms.`);

      // Loop through results and do something with them
      //console.log(">> Results");
      //records.forEach((record) => console.log(record.values));

      //if already exists, alert.
      return response.records;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  static getStepsByTrail = async (trail: string) => {
    if (!this.driver || !this.ready) await this.init();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { records, summary, keys } = await this.driver.executeQuery(
      `
      MATCH (t:Trail {id: '${trail}'})-[:HAS]->(s:Step)
      RETURN s.id AS id, s.title AS title, s.content AS content
      `,
      {},
      { database: "neo4j" }
    );

    // Summary information
    //console.log(`>> The query ${summary.query.text} ` + `returned ${records.length} records ` + `in ${summary.resultAvailableAfter} ms.`);

    // Loop through results and do something with them
    /* console.log(">> Results");
    records.forEach((record) => {
      console.log("\n\nid: " + record.get("id"));
      console.log("title:" + record.get("title"));
      console.log("content:" + record.get("content"));
    }); */
    return records;
  };

  static saveTrail = async (trail: { id: string; title: string }) => {
    if (!this.driver) await this.init();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { records, summary, keys } = await this.driver.executeQuery(
      `
      MATCH (tm:Theme)
      MERGE (t:Trail {id: '${trail.id}', title: '${trail.title}'})
      MERGE (tm)-[:HAS]->(t)
      RETURN t
      `,
      {},
      { database: "neo4j" }
    );

    // Summary information
    //console.log(`>> The query ${summary.query.text} ` + `returned ${records.length} records ` + `in ${summary.resultAvailableAfter} ms.`);

    // Loop through results and do something with them
    //console.log(">> Results");
    //records.forEach((record) => console.log(record.values));
    return records[0];
  };

  static getTrail = async (trail: string) => {
    if (!this.driver || !this.ready) await this.init();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { records, summary, keys } = await this.driver.executeQuery(
      `
      MATCH (t:Trail {id: '${trail}'})
      RETURN t.id as id, t.title as title
      `,
      {},
      { database: "neo4j" }
    );
    return records;
  };
}
