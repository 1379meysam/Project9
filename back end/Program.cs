var builder = WebApplication.CreateBuilder(args);

// فعال کردن CORS (اجازه به درخواست از هر مبدا)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
