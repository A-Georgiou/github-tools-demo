def is_prime(n):
    """
    Check if a number is prime.
    Returns True if n is prime, False otherwise.
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

def goldbach_pairs(n):
    """
    Find all pairs of prime numbers that sum to the given even integer.
    Returns a list of tuples containing the Goldbach pairs.
    """
    if n <= 2 or n % 2 != 0:
        raise ValueError("Input must be an even integer greater than 2.")
    
    pairs = []
    for i in range(2, n // 2 + 1):
        if is_prime(i) and is_prime(n - i):
            pairs.append((i, n - i))
    
    return pairs

if __name__ == "__main__":
    try:
        num = int(input("Enter an even integer greater than 2 to test the Goldbach conjecture: "))
        pairs = goldbach_pairs(num)
        print(f"Goldbach pairs for {num}: {pairs}")
    except ValueError as e:
        print("Error:", e)