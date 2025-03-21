-- Function to count posts for each tag
CREATE OR REPLACE FUNCTION get_tags_with_post_count()
RETURNS TABLE (
  id INTEGER,
  name VARCHAR(50),
  slug VARCHAR(50),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  post_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.name,
    t.slug,
    t.created_at,
    t.updated_at,
    COUNT(pt.post_id)::BIGINT AS post_count
  FROM
    tags t
  LEFT JOIN
    post_tags pt ON t.id = pt.tag_id
  GROUP BY
    t.id
  ORDER BY
    t.name;
END;
$$ LANGUAGE plpgsql;
