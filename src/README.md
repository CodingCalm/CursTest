# Project Architecture

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (Öppet samtal)
│   ├── posts/[id]/        # Dynamic post detail pages
│   ├── propositions/      # Propositioner page
│   └── voting/           # Votering page
├── components/            # React components
│   ├── Header.tsx        # Site header with navigation
│   ├── PostCard.tsx      # Individual post card
│   ├── MainContent.tsx   # Main content wrapper
│   └── index.ts          # Component exports
├── types/                # TypeScript type definitions
│   ├── post.ts           # Post interface and service types
│   └── index.ts          # Type exports
├── services/             # Service layer implementations
│   ├── mock-post-service.ts    # Mock service for development
│   ├── sql-post-service.ts     # SQL service for production
│   └── index.ts          # Service exports and configuration
├── data/                 # Mock data and static data
│   ├── mock-posts.ts     # Mock post data
│   └── index.ts          # Data exports
└── lib/                  # Utilities and helpers (future)
```

## Architecture Overview

### 🏗️ **Separation of Concerns**

#### **Types (`src/types/`)**
- **`post.ts`**: Contains `Post` interface and `PostService` interface
- **Pure TypeScript definitions** with no implementation
- **Database-agnostic** design

#### **Services (`src/services/`)**
- **`mock-post-service.ts`**: Mock implementation for development
- **`sql-post-service.ts`**: SQL implementation for production
- **`index.ts`**: Controls which service is active
- **Same interface** regardless of implementation

#### **Data (`src/data/`)**
- **`mock-posts.ts`**: Static mock data
- **No business logic** - just data
- **Easy to replace** with real data

#### **Components (`src/components/`)**
- **UI components only**
- **Import from services** for data
- **Import from types** for TypeScript

### 🔄 **Service Layer Pattern**

```typescript
// src/services/index.ts
import { MockPostService } from './mock-post-service';
// import { SQLPostService } from './sql-post-service';

// Switch between implementations here
export const postService: PostService = new MockPostService();
```

### 📁 **Benefits of This Structure**

#### **✅ Clean Separation**
- **Types** are separate from implementation
- **Services** are separate from data
- **Components** are separate from business logic

#### **✅ Easy Testing**
- **Mock service** for unit tests
- **Mock data** for component tests
- **Isolated dependencies**

#### **✅ Easy Migration**
- **Switch services** in one place
- **No component changes** needed
- **Gradual migration** possible

#### **✅ Scalable**
- **Add new services** easily
- **Add new types** without breaking existing code
- **Clear import paths**

### 🚀 **Usage Examples**

#### **Importing Types**
```typescript
import { Post, PostService } from '@/types';
```

#### **Importing Services**
```typescript
import { postService } from '@/services';
```

#### **Importing Data**
```typescript
import { mockPostsData } from '@/data';
```

#### **Using in Components**
```typescript
import { postService } from '@/services';
import { Post } from '@/types';

const [posts, setPosts] = useState<Post[]>([]);

useEffect(() => {
  const loadPosts = async () => {
    const data = await postService.getAllPosts();
    setPosts(data);
  };
  loadPosts();
}, []);
```

### 🔧 **Switching to SQL Database**

1. **Install database dependencies**
2. **Update environment variables**
3. **Modify `src/services/index.ts`**:
   ```typescript
   // Comment out mock service
   // export const postService: PostService = new MockPostService();
   
   // Uncomment SQL service
   const dbConnection = await createDatabaseConnection();
   export const postService: PostService = new SQLPostService(dbConnection);
   ```

### 🧪 **Testing Strategy**

#### **Unit Tests**
- **Mock service** for testing business logic
- **Mock data** for testing components
- **Isolated service tests**

#### **Integration Tests**
- **Real service** with test database
- **End-to-end** component testing
- **API testing**

### 📈 **Future Extensions**

#### **New Services**
- **User service** for authentication
- **Comment service** for comments
- **Vote service** for voting

#### **New Types**
- **User interface**
- **Comment interface**
- **Vote interface**

#### **New Data**
- **User mock data**
- **Comment mock data**
- **Vote mock data**

This architecture provides a solid foundation for a scalable, maintainable application that can easily transition from mock data to a real database while maintaining clean separation of concerns.
