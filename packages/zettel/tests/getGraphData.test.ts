import { zettelkasten } from './zettelkasten';

test('getGraphData should return links and nodes', async () => {
  const graphData = await zettelkasten.getGraphData();
  expect(graphData.links.length).toBeGreaterThan(0);
  expect(graphData.nodes.length).toBeGreaterThan(0);
});

test('not draft notes should be in the graph', async () => {
  const graphData = await zettelkasten.getGraphData();
  const ids = graphData.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['blog/note-not-a-draft', 'blog/note-a'])
  );
});

test('draft notes should not be in the graph', async () => {
  const graphData = await zettelkasten.getGraphData();
  const ids = graphData.nodes.map((node) => {
    return node.id;
  });
  expect(ids).not.toMatchObject(expect.arrayContaining(['blog/note-draft']));
});

test('tags should be in the graph', async () => {
  const graphData = await zettelkasten.getGraphData();
  const tags =
    (await zettelkasten.getNote('blog/note-not-a-draft'))?.tags || [];
  const ids = graphData.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(tags));
});

test('references should be the note source', async () => {
  const id = 'blog/note-not-a-draft-and-reference-note-not-a-draft';

  const referencingNote = await zettelkasten.getNote(id);

  expect(referencingNote).not.toBeUndefined();

  const graphData = await zettelkasten.getGraphData();

  referencingNote?.references.forEach((reference) => {
    const referenceLink = graphData.links.find((link) => {
      return link.source === reference.id && link.target === id;
    });
    expect(referenceLink).toBeTruthy();
  });
});

test('backlinks should be the note target', async () => {
  const id = 'blog/note-not-a-draft';

  const referencedNote = await zettelkasten.getNote(id);

  expect(referencedNote).not.toBeUndefined();

  const graphData = await zettelkasten.getGraphData();

  referencedNote?.backlinks.forEach((backlink) => {
    const referenceLink = graphData.links.find((link) => {
      return link.source === id && link.target === backlink.id;
    });
    expect(referenceLink).toBeTruthy();
  });
});

test('should not have self references', async () => {
  const graphData = await zettelkasten.getGraphData();
  graphData.links.forEach((link) => {
    expect(link.source).not.toEqual(link.target);
  });
});

test('should not have duplicate links', async () => {
  const graphData = await zettelkasten.getGraphData();
  const links = graphData.links.map((link) => {
    return `${link.source}---${link.target}`;
  });
  expect(links).toEqual([...new Set(links)]);
});

test('shoud not have duplicate nodes', async () => {
  const graphData = await zettelkasten.getGraphData();
  const nodes = graphData.nodes.map((node) => {
    return node.id;
  });
  expect(nodes).toEqual([...new Set(nodes)]);
});

test('should not have inverse links', async () => {
  const graphData = await zettelkasten.getGraphData();
  graphData.links.forEach((link) => {
    const inverseLink = graphData.links.find((l) => {
      return l.source === link.target && l.target === link.source;
    });
    expect(inverseLink).toBeUndefined();
  });
});

test('source and target should not be the same', async () => {
  const graphData = await zettelkasten.getGraphData();
  graphData.links.forEach((link) => {
    expect(link.source).not.toEqual(link.target);
  });
});
