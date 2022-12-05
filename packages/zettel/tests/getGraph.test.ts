import { zettelkasten } from './zettelkasten';

test('getGraphData should return links and nodes', async () => {
  const graph = await zettelkasten.getGraphData();
  expect(graph.links.length).toBeGreaterThan(0);
  expect(graph.nodes.length).toBeGreaterThan(0);
});

test('not draft notes should be in the graph', async () => {
  const graph = await zettelkasten.getGraphData();
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/note-not-a-draft', '/blog/note-a'])
  );
});

test('draft notes should not be in the graph', async () => {
  const graph = await zettelkasten.getGraphData();
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).not.toMatchObject(expect.arrayContaining(['/blog/note-draft']));
});

test('tags should be in the graph', async () => {
  const graph = await zettelkasten.getGraphData();
  const tags =
    (await zettelkasten.getNote('/blog/note-not-a-draft'))?.tags || [];
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(tags));
});

test('references should be the note source', async () => {
  const id = '/blog/note-not-a-draft-and-reference-note-not-a-draft';

  const referencingNote = await zettelkasten.getNote(id);

  expect(referencingNote).not.toBeUndefined();

  const graph = await zettelkasten.getGraphData();

  referencingNote?.references.forEach((reference) => {
    const referenceLink = graph.links.find((link) => {
      return link.source === reference.id && link.target === id;
    });
    expect(referenceLink).toBeTruthy();
  });
});

test('backlinks should be the note target', async () => {
  const id = '/blog/note-not-a-draft';

  const referencedNote = await zettelkasten.getNote(id);

  expect(referencedNote).not.toBeUndefined();

  const graph = await zettelkasten.getGraphData();

  referencedNote?.backlinks.forEach((backlink) => {
    const referenceLink = graph.links.find((link) => {
      return link.source === id && link.target === backlink.id;
    });
    expect(referenceLink).toBeTruthy();
  });
});

test('should not have self references', async () => {
  const graph = await zettelkasten.getGraphData();
  graph.links.forEach((link) => {
    expect(link.source).not.toEqual(link.target);
  });
});

test('should not have duplicate links', async () => {
  const graph = await zettelkasten.getGraphData();
  const links = graph.links.map((link) => {
    return `${link.source}---${link.target}`;
  });
  expect(links).toEqual([...new Set(links)]);
});

test('shoud not have duplicate nodes', async () => {
  const graph = await zettelkasten.getGraphData();
  const nodes = graph.nodes.map((node) => {
    return node.id;
  });
  expect(nodes).toEqual([...new Set(nodes)]);
});

test('should not have inverse links', async () => {
  const graph = await zettelkasten.getGraphData();
  graph.links.forEach((link) => {
    const inverseLink = graph.links.find((l) => {
      return l.source === link.target && l.target === link.source;
    });
    expect(inverseLink).toBeUndefined();
  });
});
