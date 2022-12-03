import { zettelkasten } from './zettelkasten';

test('getGraph should return links and nodes', async () => {
  const graph = await zettelkasten.getGraph();
  expect(graph.links.length).toBeGreaterThan(0);
  expect(graph.nodes.length).toBeGreaterThan(0);
});

test('not draft posts should be in the graph', async () => {
  const graph = await zettelkasten.getGraph();
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/post-not-a-draft', '/blog/post-a'])
  );
});

test('draft posts should not be in the graph', async () => {
  const graph = await zettelkasten.getGraph();
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).not.toMatchObject(expect.arrayContaining(['/blog/post-draft']));
});

test('tags should be in the graph', async () => {
  const graph = await zettelkasten.getGraph();
  const tags =
    (await zettelkasten.getPost('/blog/post-not-a-draft'))?.tags || [];
  const ids = graph.nodes.map((node) => {
    return node.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(tags));
});

test('backlinks and references should be connected with post', async () => {
  const referencedPost = await zettelkasten.getPost({
    id: '/blog/post-not-a-draft',
  });

  const referencingPost = await zettelkasten.getPost({
    id: '/blog/post-not-a-draft-and-reference-another',
  });

  const graph = await zettelkasten.getGraph();

  referencedPost?.backlinks.forEach((backlink) => {
    const backlinkLink = graph.links.find((link) => {
      return link.source === backlink.id && link.target === referencedPost.id;
    });
    expect(backlinkLink).toBeTruthy();
  });

  referencingPost?.references.forEach((reference) => {
    const referenceLink = graph.links.find((link) => {
      return link.source === referencingPost.id && link.target === reference.id;
    });
    expect(referenceLink).toBeTruthy();
  });
});

test('should not have self references', async () => {
  const graph = await zettelkasten.getGraph();
  graph.links.forEach((link) => {
    expect(link.source).not.toEqual(link.target);
  });
});

test('should not have duplicate links', async () => {
  const graph = await zettelkasten.getGraph();
  const links = graph.links.map((link) => {
    return `${link.source}---${link.target}`;
  });
  expect(links).toEqual([...new Set(links)]);
});

test('shoud not have duplicate nodes', async () => {
  const graph = await zettelkasten.getGraph();
  const nodes = graph.nodes.map((node) => {
    return node.id;
  });
  expect(nodes).toEqual([...new Set(nodes)]);
});

test('should not have inverse links', async () => {
  const graph = await zettelkasten.getGraph();
  graph.links.forEach((link) => {
    const inverseLink = graph.links.find((l) => {
      return l.source === link.target && l.target === link.source;
    });
    expect(inverseLink).toBeUndefined();
  });
});
