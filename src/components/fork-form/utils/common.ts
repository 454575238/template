export function get(entity: any, path: (string | number)[]) {
  let current = entity
  for (let i = 0; i < path.length; i++) {
    if (!current) return undefined
    current = current[path[i]]
  }

  return current
}

export function set<Entity = any, Output = any, Value = any>(
  entity: Entity,
  paths: (string | number)[],
  value: Value,
  removeIfUndefined: boolean,
) {
  if (
    paths.length &&
    removeIfUndefined &&
    value === undefined &&
    !get(entity, paths.slice(0, -1))
  ) {
    return entity
  }

  return internalSet(entity, paths, value, removeIfUndefined)
}

function internalSet<Entity = any, Output = Entity, Value = any>(
  entity: Entity,
  paths: (string | number)[],
  value: Value,
  removeIfUndefined: boolean,
): Output {
  if (!paths.length) return (value as unknown) as Output

  const [path, ...restPath] = paths
  let clone: Record<typeof path, any>

  if (!entity && typeof path === 'number') {
    clone = []
  } else if (Array.isArray(entity)) {
    clone = [...entity]
  } else {
    clone = { ...entity }
  }

  if (removeIfUndefined && value === undefined && restPath.length === 1) {
    delete clone[path][restPath[0]]
  } else {
    clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined)
  }

  return clone as Output
}
