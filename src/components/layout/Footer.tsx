export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Kindred. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
