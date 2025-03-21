import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // 从URL中获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json([], { status: 200 });
    }
    
    // 调用数据库搜索函数
    const results = await searchPosts(query);
    
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
